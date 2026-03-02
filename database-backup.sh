#!/bin/bash

# Start an infinite loop!
while true; do
	CYCLE_START=$(date +%s)
	TIMESTAMP=$(date +%Y%m%d_%H%M%S)
	BACKUP_FILE="/tmp/${TIMESTAMP}.dump"

	echo "[$(date)] Starting backup process..."
	curl --silent --fail "${SENTRY_CRONS}?status=in_progress" || echo "[$(date)] Warning: Sentry check-in failed."

	if PGPASSWORD=$POSTGRES_PASSWORD pg_dump --host=$POSTGRES_HOST --username=$POSTGRES_USER --format=custom --file=$BACKUP_FILE $POSTGRES_DB; then
		if [ -s "$BACKUP_FILE" ]; then
			echo "[$(date)] Backup file created successfully, uploading to R2..."

			if aws --endpoint-url $AWS_S3_ENDPOINT \
				s3 cp $BACKUP_FILE \
				s3://$S3_BUCKET/${TIMESTAMP}.dump; then

				echo "[$(date)] Backup successfully uploaded to R2."
				rm $BACKUP_FILE
				curl --silent --fail "${SENTRY_CRONS}?status=ok" || echo "[$(date)] Warning: Sentry check-in failed."
			else
				echo "[$(date)] ERROR: Failed to upload backup to R2."
				rm $BACKUP_FILE
				curl --silent --fail "${SENTRY_CRONS}?status=error" || echo "[$(date)] Warning: Sentry check-in failed."
			fi
		else
			echo "[$(date)] ERROR: Backup file is empty."
			rm -f $BACKUP_FILE
			curl --silent --fail "${SENTRY_CRONS}?status=error" || echo "[$(date)] Warning: Sentry check-in failed."
		fi
	else
		echo "[$(date)] ERROR: pg_dump failed."
		rm -f $BACKUP_FILE
		curl --silent --fail "${SENTRY_CRONS}?status=error" || echo "[$(date)] Warning: Sentry check-in failed."
	fi

	ELAPSED=$(( $(date +%s) - CYCLE_START ))
	SLEEP_TIME=$(( 28800 - ELAPSED )) # 8 hours.

	if [ $SLEEP_TIME -gt 0 ]; then
		sleep $SLEEP_TIME
	fi
done

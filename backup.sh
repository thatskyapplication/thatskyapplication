#!/bin/bash

# Start an infinite loop!
while true; do
	TIMESTAMP=$(date +%Y%m%d_%H%M%S)
	BACKUP_FILE="/tmp/backup_${TIMESTAMP}.sql.gz"

	echo "[$(date)] Starting backup process..."

	if PGPASSWORD=$POSTGRES_PASSWORD pg_dump -h $POSTGRES_HOST -U $POSTGRES_USER $POSTGRES_DB | gzip > $BACKUP_FILE; then
		if [ -s "$BACKUP_FILE" ]; then
			echo "[$(date)] Backup file created successfully, uploading to R2..."

			if aws --endpoint-url $AWS_S3_ENDPOINT \
				s3 cp $BACKUP_FILE \
				s3://$S3_BUCKET/${TIMESTAMP}.sql.gz; then

				echo "[$(date)] Backup successfully uploaded to R2."
				rm $BACKUP_FILE
			else
				echo "[$(date)] ERROR: Failed to upload backup to R2."
				rm $BACKUP_FILE
			fi
		else
			echo "[$(date)] ERROR: Backup file is empty."
			rm -f $BACKUP_FILE
		fi
	else
		echo "[$(date)] ERROR: pg_dump failed."
		rm -f $BACKUP_FILE
	fi

	# Wait 8 hours before the next backup.
	sleep 28800
done

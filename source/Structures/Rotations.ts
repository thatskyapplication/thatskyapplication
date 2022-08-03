import { setInterval } from "node:timers";
import time from "date-fns-tz";
import Notification, { LightEvent } from "./Notification.js";

function sendNotification(type: typeof LightEvent[keyof typeof LightEvent]): void {
  for (const notification of Notification.cache.values()) notification.send(type);
}

export default new class {
  clock(): void {
    setInterval(() => {
      const date = time.utcToZonedTime(Date.now(), "America/Los_Angeles");
      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();
      const seconds = date.getUTCSeconds();

      if (seconds === 0) {
        if (hours % 2 === 0) {
          switch (minutes) {
            case 0:
              sendNotification(LightEvent.PollutedGeyser);
              break;
            case 30:
              sendNotification(LightEvent.Grandma);
              break;
            case 45:
              sendNotification(LightEvent.Turtle);
              break;
          }
        } else {
          switch (minutes) {
            case 4:
              sendNotification(LightEvent.ShardEruption);
              break;
          }
        }
      }
    }, 1000);
  }
};

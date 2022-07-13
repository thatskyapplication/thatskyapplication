import { setInterval } from "node:timers";
import time from "date-fns-tz";
import Notification, { LightEvent } from "./Notification.js";

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
              Notification.send(LightEvent.PollutedGeyser);
              break;
            case 30:
              Notification.send(LightEvent.Grandma);
              break;
            case 45:
              Notification.send(LightEvent.Turtle);
              break;
          }
        } else {
          switch (minutes) {
            case 4:
              Notification.send(LightEvent.ShardEruption);
              break;
          }
        }
      }
    }, 1000);
  }
};

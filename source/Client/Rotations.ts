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

      if (hours % 2 === 0 && seconds === 0) {
        switch (minutes) {
          case 0:
            Notification.send(LightEvent.PollutedGeyser);
            break;
          case 30:
            Notification.send(LightEvent.PollutedGeyser);
            break;
          case 50:
            Notification.send(LightEvent.Turtle);
            break;
        }
      }
    }, 1000);
  }
};

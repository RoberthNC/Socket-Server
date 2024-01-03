import { v4 as uuid } from "uuid";
export class UUIDAdapter {
  public static v4() {
    return uuid();
  }
}

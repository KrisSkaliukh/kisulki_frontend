export interface Action<Payload = unknown> {
  type: string;
  payload: Payload;
}

export type RawContact = {
  id: number;
  type: "email" | "facebook" | "phone" | "location";
  name: string;
  value: string;
  image: string | null;
};

import { StaticImageData } from "next/image";

type Props = {
  firstName: string;
  lastName: string;
  avatar?: string | StaticImageData;
};

export const teamLeaders: Props[] = [
  {
    firstName: "Colin",
    lastName: "Murray",
    avatar: "/images/cm.jpg",
  },
  {
    firstName: "Tom",
    lastName: "Phillips",
  },
  {
    firstName: "Liam",
    lastName: "Fuentes",
  },
  {
    firstName: "Tina",
    lastName: "Fey",
    avatar: "/images/tf.jpg",
  },
  {
    firstName: "Katie",
    lastName: "Johnson",
  },
  {
    firstName: "Tina",
    lastName: "Jones",
  },
  {
    firstName: "Amy",
    lastName: "Adams",
  },
  {
    firstName: "Ryan",
    lastName: "Lopez",
    avatar: "/images/rl.jpg",
  },
  {
    firstName: "Jenny",
    lastName: "Jones",
  },
];

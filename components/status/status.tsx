"use client";

import BatteryAlertIcon from "@mui/icons-material/BatteryAlert";
import BatteryCharging50Icon from "@mui/icons-material/BatteryCharging50";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import RunCircleIcon from "@mui/icons-material/RunCircle";
import SpeakerIcon from "@mui/icons-material/Speaker";

import Loading from "@/components/loading/loading";
import type {
  IStatus,
  IStatusComponentProps,
  IStatusData,
} from "@/components/status/status.d";

const statuses: Record<string, IStatus> = {
  weekend: {
    color: "text-sky-500",
    text: "Enjoying the weekend.",
    icon: (
      <EmojiEmotionsIcon
        className="mr-1"
        sx={{
          color: "#0ea5e9",
        }}
        height={24}
        width={24}
      />
    ),
  },
  sleep: {
    color: "gray-500",
    text: "Sleeping.",
    icon: (
      <BatteryAlertIcon
        className="mr-1"
        sx={{
          color: "#6b7280",
        }}
        height={24}
        width={24}
      />
    ),
  },
  lunch: {
    color: "text-sky-500",
    text: "Having lunch.",
    icon: (
      <BatteryCharging50Icon
        className="mr-1"
        sx={{
          color: "#0ea5e9",
        }}
        height={24}
        width={24}
      />
    ),
  },
  work: {
    color: "text-red-700",
    text: "At work.",
    icon: (
      <LaptopChromebookIcon
        className="mr-1"
        sx={{
          color: "#b91c1c",
        }}
        height={24}
        width={24}
      />
    ),
  },
  free: {
    color: "text-sky-500",
    text: "Enjoying the life.",
    icon: (
      <RunCircleIcon
        className="mr-1"
        sx={{
          color: "#0ea5e9",
        }}
        height={24}
        width={24}
      />
    ),
  },
  listening: {
    color: "text-violet-600",
    text: "Listening to music.",
    icon: (
      <SpeakerIcon
        className="mr-1"
        sx={{
          color: "#7c3aed",
        }}
        height={24}
        width={24}
      />
    ),
  },
};

export default function Status({ dataFromAPI }: IStatusComponentProps) {
  const statusContent: IStatusData = {
    time: dataFromAPI?.time,
    status: statuses[`${dataFromAPI?.status}`],
  };

  return statusContent.status ? (
    <span
      className="status
        block
        center-x
        flex
        items-center
        text-gray-600
        w-full"
    >
      <span
        className={`flex
          items-center
          mr-1
          ${statusContent.status.color}`}
      >
        {statusContent.status.icon}
        <span
          className="time
            font-bold
            mr-1"
        >
          {statusContent.time}
        </span>
        <span
          className="utc-time
            text-xs"
        >
          (UTC -03:00) &#8213;
        </span>
      </span>

      {statusContent.status.text}
    </span>
  ) : (
    <Loading />
  );
}

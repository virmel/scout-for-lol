type Server = {
  players: string[];
  channel: string;
};

type Database = {
  servers: Record<string, Server>;
};

export const database: Database = {
  servers: {
    "1092210479755178054": {
      players: [
        "T0unTFnLyDJ5TVfhWOQNBI2aZIjDBEw9F73oHrE5idNNZAo",
      ],
      channel: "1176684904923279390",
    },
  },
};

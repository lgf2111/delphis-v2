import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import { api } from "~/utils/api";

export default function ListBookings() {
  const router = useRouter();
  const { message } = router.query;
  if (message) {
    toast.success(message as string);
  }

  const { data } = api.booking.listBookings.useQuery();
  return (
    <div>
      {data?.map((booking) => (
        <div key={booking.id}>
          <h1>{booking.id}</h1>
          <p>{booking.status}</p>
        </div>
      ))}
    </div>
  );
}

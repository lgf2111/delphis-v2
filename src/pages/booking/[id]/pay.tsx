import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { api } from "~/utils/api";

export default function RejectBooking() {
  const router = useRouter();
  const { mutate } = api.booking.payBooking.useMutation();
  const { id } = router.query;
  useEffect(() => {
    mutate({ id: id as string });
    void router.push(`/booking?message=${encodeURIComponent("Booking paid!")}`);
  }, [id, mutate, router]);

  if (!id) return <div>Invalid ID</div>;
}

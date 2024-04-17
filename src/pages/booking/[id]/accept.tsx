import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { api } from "~/utils/api";

export default function AcceptBooking() {
  const router = useRouter();
  const { mutate } = api.booking.acceptBooking.useMutation();
  const { id } = router.query;
  useEffect(() => {
    mutate({ id: id as string });
    void router.push(
      `/booking?message=${encodeURIComponent("Booking accepted!")}`,
    );
  }, [id, mutate, router]);

  if (!id) return <div>Invalid ID</div>;
}

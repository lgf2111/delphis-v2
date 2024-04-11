import React, { useState } from "react";
import Filters from "./filters";
import Tutors from "./tutors";

export default function Search() {
  const [filters, setFilters] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-5 py-10">
      <Filters filters={filters} setFilters={setFilters} />
      <Tutors filters={filters} />
    </div>
  );
}

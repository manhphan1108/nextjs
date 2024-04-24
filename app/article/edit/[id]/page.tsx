'use client';

import { useParams } from "next/navigation";
import AddArticle from "../../add/page";

export default function editArticle() {
  const { id } = useParams() as {
    id: string;
  }
  return (
    <>
      <AddArticle id={id} />
    </>
  )
}
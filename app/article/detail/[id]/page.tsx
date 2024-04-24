'use client';

import { findArticles } from '@/app/api/articles';
import { ArticelType } from '@/app/types/articlesType';
import { Card, Row } from 'antd';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
const { Meta } = Card;

export default function detailArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<ArticelType>();
  console.log(article);
  useEffect(() => {
    if (id) {
      const findOneArticle = async () => {
        const data = await findArticles(String(id));
        setArticle(data);
      }
      findOneArticle();
    }
  }, [id])
  return (
    <>
      {article ? (
        <Row justify="center" align="middle" style={{ height: '100vh' }}>
          <Card
            hoverable
            cover={<img alt="example" src={article.image} style={{ width: "500px" }} />}>
            <Meta title={article.title} description={article.description} />
          </Card>
        </Row>
      ) :
        <Card>Hệ thống đang gặp sự cố vui lòng thử lại sau</Card>
      }
    </>
  )
}
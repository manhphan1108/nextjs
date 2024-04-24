'use client';

import React, { useEffect, useState } from 'react';
import { Row, Col, Image, Card, Space, notification, Typography } from 'antd';
import 'antd/dist/reset.css';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { deleteArticles, getAllArticles } from '../api/articles';
import { ArticelType } from '../types/articlesType';
import styles from "../page.module.css"
import Link from 'next/link';
const { Paragraph } = Typography;

export default function ArticlePage() {
  const [article, setArticle] = useState([]);
  useEffect(() => {
    getAllArticles().then((data) => {
      setArticle(data);
    });
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteArticles(id);
      setArticle(article?.filter((article: ArticelType) => article.id !== id));
      notification.success({
        message: "Delete article successfully"
      })
    } catch (error) {
      console.log(error);
    }
  };

  const actions = (id: string) => [
    <Link as={`/article/edit/${id}`} href={`/article/edit/${id}`} ><EditOutlined type="message" style={{ fontSize: '22px', color: 'rgb(235 165 0)', cursor: 'pointer' }} /></Link>,
    <DeleteOutlined onClick={() => handleDelete(id)} type="message" style={{ fontSize: '22px', color: '#ff0000', cursor: 'pointer' }} />,
  ];

  return (
    <>
      <Link className={styles.btnAddArticle} as={`/article/add`} href={`/article/eadd`}><PlusCircleOutlined style={{ fontSize: '22px', color: '#19ff00', cursor: 'pointer' }} /></Link>
      <Row gutter={[20, 20]} style={{ padding: '20px' }}>
        {article?.map((item: ArticelType, index: number) => {
          return <Col
            key={index}
            span={6}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Space direction="vertical" size={16}>
              <Card actions={actions(item.id)} style={{ width: 500 }}>
                <Image src={item.image} />
                <Link as={`/article/detail/${item.id}`} href={`/article/detail/${item.id}`} >
                  <Typography.Title level={3} style={{ margin: 0 }}>
                    {item.title}
                  </Typography.Title>
                </Link>
                <Paragraph>{item.description}</Paragraph>
              </Card>
            </Space>
          </Col>
        })}
      </Row >
    </>
  );
}
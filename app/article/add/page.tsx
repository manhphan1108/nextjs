'use client';

import { createArticles, findArticles, updaterticles } from "../../api/articles";
import { ArticelType } from "../../types/articlesType";
import { useForm, Controller } from 'react-hook-form';
import { Button, Form, Input, Row, Tooltip, notification, message } from "antd";
import styles from '../../page.module.css';
import { useEffect } from "react";
import { useRouter } from 'next/navigation'
import { ErrorMessage } from "@hookform/error-message"

interface IFormInput {
  title: string
  image?: string
  description?: string
}

const addArticle = ({ id }: { id: string }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>();
  const router = useRouter();
  console.log(errors);
  useEffect(() => {
    if (id) {
      const getOneArticle = async () => {
        const data = await findArticles(id);
        reset(data);
      };
      getOneArticle();
    }
  }, [id]);

  const onSubmit = async (article: any) => {
    try {
      if (id) {
        await updaterticles(id, article);
        notification.success({
          message: "Update article successfully"
        });
      } else {
        await createArticles(article);
        notification.success({
          message: "Create article successfully"
        })
      }
      router.push('/article');
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Form onFinish={handleSubmit(onSubmit)} className={styles.formAddArticle}>
        <Form.Item label="Title">
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Title is required' }}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                status={error ? "error" : ""}
                placeholder="Enter your description"
              />
            )}
          />
        </Form.Item>
        <ErrorMessage
          errors={errors}
          name="title"
          render={({ message }) => <p>{message}</p>}
        />
        <Form.Item label="Des" rules={[
          {
            required: true,
            message: 'Please enter your username!',
          },
        ]}>
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                placeholder="Enter your description"
              />
            )}
          />
        </Form.Item>
        <Form.Item label="Image">
          <Controller
            name="image"
            control={control}
            rules={{ required: 'Name is required' }}
            render={({ field, fieldState: { error } }) => (
              <Input {...field} placeholder="Enter your Image" />
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default addArticle;
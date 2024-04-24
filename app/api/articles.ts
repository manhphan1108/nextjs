import { ArticelType } from '../types/articlesType';
import instance from './instance';

export const getAllArticles = async () => {
  try {
    const { data } = await instance.get(
      '/',
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const findArticles = async (id: string) => {
  try {
    const { data } = await instance.get(`${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updaterticles = async (id: string, item: ArticelType) => {
  try {
    const { data } = await instance.patch(`${id}`, item);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteArticles = async (id: string) => {
  try {
    const { data } = await instance.delete(`${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createArticles = async (item: ArticelType) => {
  try {
    const { data } = await instance.post('', item);
    return data;
  } catch (error) {
    console.log(error);
  }
};  
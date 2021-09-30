import { Response, Request } from 'express';
import { Cat, CatType } from './cats.model';

/**
 * READ : 고양이 전체 데이터 조회
 */
export const readAllCats = (req: Request, res: Response) => {
  try {
    const cats = Cat;
    // throw new Error("db connected failed");
    res.status(200).send({
      success: true,
      data: {
        cats,
      },
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};

/**
 * READ : 특정 고양이 데이터 조회
 */
export const readCatsFromId = (req: Request, res: Response) => {
  try {
    const params = req.params;
    const cats = Cat.find((cat) => {
      return cat.id === params.id;
    });
    res.status(200).send({
      success: true,
      data: {
        cats,
      },
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};

/**
 * CREATE : 새로운 고양이 api 추가
 */
export const createCat = (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log(data);

    // Create Cat
    Cat.push(data);

    res.status(200).send({
      success: true,
      data: { data },
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};

/**
 * UPDATE : 고양이 데이터 업데이트 => PUT
 */
export const updateCat = (req: Request, res: Response) => {
  try {
    const params = req.params;
    const body = req.body;

    let result;

    Cat.forEach((cat) => {
      if (cat.id === params.id) {
        cat = body;
        result = cat;
      }
    });

    res.status(200).send({
      success: true,
      data: {
        cat: result,
      },
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};

/**
 * UPDATE : 고양이 데이터 부분적 업데이트 => PATCH
 */
export const updatePartialCat = (req: Request, res: Response) => {
  try {
    const params = req.params;
    const body = req.body;

    let result;

    Cat.forEach((cat) => {
      if (cat.id === params.id) {
        cat = { ...cat, ...body };
        result = cat;
      }
    });

    res.status(200).send({
      success: true,
      data: {
        cat: result,
      },
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};

/**
 * DELETE : 고양이 데이터 삭제 => DELETE
 */
export const deleteCat = (req: Request, res: Response) => {
  try {
    const params = req.params;

    const newCat = Cat.filter((cat) => cat.id !== params.id);

    res.status(200).send({
      success: true,
      data: newCat,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};

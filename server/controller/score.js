import * as scoreRepository from "../data/score.js";

export async function getScores(req, res) {
  const id = req.params.id;
  const data = await scoreRepository.getAllByUserId(id);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `data id(${id}) not found` });
  }
}

export async function createScore(req, res, next) {
  const { userID, score, time } = req.body;
  const data = await scoreRepository.create(userID, score, time);
  res.status(201).json(data);
}

// 사용할지 안할지 미지수
export async function updateScore(req, res, next) {
  const id = req.params.userID;
  const text = req.body.text;
  const data = await scoreRepository.update(id, text);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `socre id(${id}) not found` });
  }
}

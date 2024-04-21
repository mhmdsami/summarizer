from fastapi import FastAPI
from transformers import pipeline
from youtube_transcript_api import YouTubeTranscriptApi

from pydantic import BaseModel


app = FastAPI()
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

@app.get("/")
def root():
    return {"message": "Welcome to the Summarization API!"}

class Article(BaseModel):
    text: str

@app.post("/summarize")
def summarize(article: Article):
    [summary] = summarizer(article.text, max_length=130, min_length=30, do_sample=False)
    return {"summary": summary["summary_text"]}

class Video(BaseModel):
    url: str

@app.post("/summarize-video")
def summarize_video(video: Video):
    video_id = video.url.split("=")[-1]
    transcript = YouTubeTranscriptApi.get_transcript(video_id)
    text = " ".join([line["text"].replace("\n", "").replace("\xa0", "") for line in transcript])
    [summary] = summarizer(text, max_length=500, min_length=30, )
    return {"summary": summary["summary_text"]}

# Summarizer

Web client to summarize text using the Hugging Face pipline API with [facebook/bart-large-cnn](https://huggingface.co/facebook/bart-large-cnn).

![summarizer-client](https://github.com/mhmdsami/summarizer/assets/78439283/3587c7c1-5c06-4886-813f-96e4c3c65152)

## Setup

### Server

- Create a virtual environment and install the requirements

```
python3 -m venv venv
```

- Activate the virtual environment

```
source venv/bin/activate
```

- Install the requirements

```
pip install -r server/requirements.txt
```

- Run the server

```
uvicorn server.main:app --reload
```

### Client

- Create a `.env` file in the `client` directory (see [`.env.example`](client/.env.example) for an example)


- Install the dependencies

```
bun install
```

- Run the client

```
bun dev
```

## Tech Stack

- [Hugging Face](https://huggingface.co/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Remix](https://remix.run/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

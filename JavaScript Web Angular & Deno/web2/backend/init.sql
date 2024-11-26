-- Create the jogos table
CREATE TABLE IF NOT EXISTS jogos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    odd DECIMAL(10,2) NOT NULL,
    data_jogo TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample games
INSERT INTO jogos (nome, odd) VALUES
    ('Barcelona vs Real Madrid', 2.5),
    ('Manchester City vs Liverpool', 1.8),
    ('PSG vs Bayern Munich', 2.1);

import fs from 'fs';
import path from 'path';

export interface Article {
    id: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    author: string;
    date: string;
    tags: string[];
    image?: string;
}

const getArticlesDirectory = (locale: string) => path.join(process.cwd(), 'src/content/articles', locale);

export function getAllArticles(locale: string): Article[] {
    const articlesDirectory = getArticlesDirectory(locale);
    // Ensure directory exists to avoid crashes if empty
    if (!fs.existsSync(articlesDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(articlesDirectory);
    const articles = fileNames
        .filter((fileName) => fileName.endsWith('.json'))
        .map((fileName) => {
            const fullPath = path.join(articlesDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const article = JSON.parse(fileContents);
            return article;
        });

    // Sort articles by date descending
    return articles.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export function getArticleBySlug(slug: string, locale: string): Article | null {
    const articlesDirectory = getArticlesDirectory(locale);
    const fullPath = path.join(articlesDirectory, `${slug}.json`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContents);
}


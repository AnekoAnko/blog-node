import db from '../config/db.js'; 
import notifier from "node-notifier";

const postController = (app) => {
    app.get('/', async (req, res) => {
        const result = await db.query('SELECT * FROM posts');
        const posts = result.rows;
        res.render('index.ejs', { posts: posts });
    });

    app.post('/create-post', async (req, res) => {
        const { title, content } = req.body;
        if (title.length >= 45) {
            console.log(title.length)
            notifier.notify({
                title: 'Error!',
                message: 'Title is too long!'
            });
        }
        try {
            await db.query('INSERT INTO posts (title, content) VALUES ($1, $2)', [title, content]);
            res.redirect('/');
        } catch (error) {
            console.error('Database insertion error', error);
            res.status(500).send('Server Error');
        }
    });

    app.post('/edit', (req, res) => {
        const postId = req.body.postId;
        res.redirect('/edit/' + postId);
    });

    app.get('/edit/:postId', async (req, res) => {
        const postId = req.params.postId;
        const result = await db.query('SELECT * FROM posts WHERE id = $1', [postId]);
        const post = result.rows[0];
        res.render('edit.ejs', { post: post });
    });

    app.post('/edit/:postId', async (req, res) => {
        const postId = req.params.postId;
        const newTitle = req.body.title;
        const newContent = req.body.content;
        await db.query('UPDATE posts SET title = $1, content = $2 WHERE id = $3', [newTitle, newContent, postId]);
        res.redirect('/');
    });

    app.post('/delete', async (req, res) => {
        const postId = req.body.postId;
        await db.query('DELETE FROM posts WHERE id = $1', [postId]);
        res.redirect('/');
    });
};

export default postController;
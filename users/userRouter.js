const express = require('express')

const Users = require('./userDb.js');
const Posts = require('../posts/postDb.js');


const router = express.Router();


router.post('/', (req, res) => {
    try {
        const user = await Users.insert(req.body)
        res.status(201).json(user);

    }
    catch (error){
        console.log(error);
        res.status(500).json({
          message: 'Error creating a new user',
        });

    }
    
});

router.post('/:id/posts', async (req, res) => {
    console.log(req);
    const postInfo = { ...req.body, user_id: req.params.id };
    try {
      const post = await Posts.insert(postInfo);
      res.status(210).json(post);
    } 
    catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error posting',
      });
    }
});


router.get('/', async (req, res) => {
    try {
      const users = await Users.get(req.query);
      res.status(200).json(users);
    } catch (error) {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the users',
      });
    }
  });

router.get('/:id', async (req, res) => {
    try {
        const user = await Users.getById(req.params.id);
    
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: 'user not found' });
        }
      } catch (error) {
        // log error to server
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the user',
        });
      }



});

router.get('/:id/posts', async (req, res) => {
        try {
          const posts = await Users.getUserPosts(req.params.id)
          console.log(posts);
          res.status(200).json(posts);
        } 
        catch (error) {
          // log error to server
          console.log(error);
          res.status(500).json({
            message: 'Error getting the posts for the hub',
          });
        }
});

router.delete('/:id', async (req, res) => {
    try {
        const count = await Users.remove(req.param.id)
        if (count>0){
            res.status(200).json({mesage: 'user has been removed'})
        }
        else {
            res.status(200).json({mesage: 'could not find user with the specified ID'})

        }

    }
    catch {
        res.status(500).json({
            message: 'Error removing the hub',
          });

    }


});

router.put('/:id', (req, res) => {
    try {
        const user = await Users.update(req.params,id, req.body)

        if (user) {
            res.status(200).json(user);
        } 
        else {
          res.status(404).json({ message: 'The user could not be found' });
        }

    } catch (error) {
        res.status(500).json({
            message: 'Error updating the user'
        })

    }

});

//custom middleware

async function validateUserId(req, res, next) {
    try { 
        const { id } =req.params
        const user = await Users.findById(id);
        if(!user){
            res.status(400).json({ message: "invalid user id" })
        }
        else {
            req.user = user;
            next()
        }
    }
    catch {
        res.status(400).json({ message: "failed to process request" })

    }

};

function validateUser(req, res, next) {

    if (!req.body && !req.name){
        res.status(400).json({ message: "missing user data & name field" })

    }  else if(!req.body) {
         res.status(400).json({ message: "missing user data"})

    } else if(!req.text) {
        res.status(400).json({ message: "missing required name field" })
        
    } else {
        next()
    }

};

function validatePost(req, res, next) {
     if(!req.body) {
         res.status(400).json({ message: "missing required post data"})

    } else if(!req.body.text) {
        res.status(400).json({ message: "missing required text field" })

    } else {
        next()
    }

};


module.exports = router;

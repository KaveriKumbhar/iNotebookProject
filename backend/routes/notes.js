const express = require('express');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();

//ROUTE 1 : --------GET ALL NOTES FROM USER : GET "/api/notes/fetchallnotes"  login required-------------

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        // eslint-disable-next-line
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error is occur");
    }
})

//ROUTE 2 : --------ADD NOTES    : POST "/api/notes/addnotes"  login required-------------
router.post('/addnotes', fetchuser, [
    body('title', 'ENTER A VALID TITLE').isLength({ min: 2 }),
    body('descritption', 'ENTER ATLEAST 6 CHARACTER FOR DESCRIPTION').isLength({ min: 6 }),
], async (req, res) => {

    try {
        const { title, description, tag } = req.body
        //if there are errors then return bad request and error
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })

        const savednotes = await note.save();
        res.json(savednotes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error is occur");
    }
})

//ROUTE 3 : --------UPDATE EXISTING NOTES USING   : PUT "/api/notes/updatenotes"  login required-------------
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body

    try {
        const newnote = {};
        if (title) { newnote.title = title };
        if (description) { newnote.description = description };
        if (tag) { newnote.tag = tag };

        //find the id to update the notes and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("NOTES NOT FOUND") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("NOT ALLOWED")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error is occur");
    }

})

//ROUTE 4 : --------DELETE EXISTING NOTES USING   : DELETE "/api/notes/deletenotes"  login required-------------
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {

    try {
        //find the id to update the notes and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("NOTES NOT FOUND") }

        //allow deleteion if user is right
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("NOT ALLOWED")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "SUCCESS": "NOTES HAS BEEN DELTED", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error is occur");
    }

})

module.exports = router
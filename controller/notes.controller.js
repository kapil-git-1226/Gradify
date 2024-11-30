import { notes } from "./../model/notes.model.js"

const getnotesfunc = async (req, res) => {
    try {
        const { semester, subject } = req.query;

        console.log(semester);
        console.log(subject);
        // Validate input
        if (!semester || !subject) {
            return res.status(400).json({ message: "Semester and subject are required!" });
        }

        // Find notes matching semester and subject
        const foundNotes = await notes.find({ 
            semester: semester, 
            Subject: subject 
        });

        // Check if notes exist
        if (foundNotes.length === 0) {
            return res.status(404).json({ 
                message: "No notes found for this semester and subject",
                notes: [] 
            });
        }

        // Respond with found notes
        res.status(200).json(foundNotes.map(note => ({
            title: note.notetitle,
            description: note.pdfdescription,
            pdfUrl: note.pdfurl,
            thumbnail: note.thumbnail || '/default-thumbnail.png'
        })));

    } catch (error) {
        console.error("Error fetching notes:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export {
    getnotesfunc
}
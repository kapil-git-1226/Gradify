import { pyqs } from "./../model/pyqs.model.js"

const getpyqsfunc = async (req, res) => {
    try {
        const { semester, subject } = req.query;

        console.log(semester);
        console.log(subject);
        
        // Validate input
        if (!semester || !subject) {
            return res.status(400).json({ message: "Semester and subject are required!" });
        }

        // Find PYQs matching semester and subject
        const foundPYQs = await pyqs.find({ 
            semester: semester, 
            subject: subject 
        });
        console.log(foundPYQs);
        // Check if PYQs exist
        if (foundPYQs.length === 0) {
            return res.status(404).json({ 
                message: "No previous year questions found for this semester and subject",
                pyqs: [] 
            });
        }

        // Respond with found PYQs
        res.status(200).json(foundPYQs.map(pyq => ({
            title: pyq.pyqstitle,
            description: pyq.pyqsdescription,
            pdfUrl: pyq.pdfurl,
            thumbnail: pyq.thumbnail || '/default-thumbnail.png'
        })));

    } catch (error) {
        console.error("Error fetching previous year questions:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export {
    getpyqsfunc
}
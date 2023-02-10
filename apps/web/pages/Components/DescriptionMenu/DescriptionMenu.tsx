
// Draggable bottom sheet for description
import dynamic from 'next/dynamic'
const Draggable = dynamic(() => import('react-draggable-bottom-sheet'), {
  ssr: false
})
import ReactMarkdown from 'react-markdown'

function DescriptionMenu({ isOpen, closeBottomSheet, setDescription, description, treeMode }) {

    return (
    <Draggable isOpen={isOpen} close={closeBottomSheet}>
        <div style={{ textAlign: "center", padding: "0px 16px 16px 16px" }}>
            {treeMode === 'creator' ?
                    (<div>
                        <h3>Description</h3>
                        <textarea
                    className="description-area"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    type="text"
                    style={{ minHeight: '100px', minWidth: '1100px' }}
                        ></textarea>
                        </div>)
                    : (<div>
                        <h3>Description</h3>
                        <ReactMarkdown>{description}</ReactMarkdown>
                    </div>)}
        </div>
        </Draggable>
    )

}

export default DescriptionMenu
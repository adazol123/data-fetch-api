import React, { useContext } from 'react'
import { useMotionValue, motion } from 'framer-motion'
import DataContext from '../../util/DataContext';

const NewsModal = () => {
    const { toggle, setToggle, selectedItem} = useContext(DataContext)
    return (
        <>
        {toggle &&
        (<Wrapper toggle={toggle} setToggle={setToggle}> 
            <p className='modal-info'>Do you want to visit?</p>
            <p className='modal-subtitle'>{selectedItem[0]}</p>
            {/* <p className="modal-link">URL: 
                <span className='url'> {selectedItem[1]}</span>
            </p> */}
            <div className="modal-footer">
                <button onClick={() =>
                    setToggle(prev => false)
                }>
                <a href={selectedItem[1]} target="_blank" rel="noopener noreferrer">
                    Continue
                </a>
                </button>
                <button onClick={() =>
                    setToggle(prev => false)
                }>Cancel</button>
            </div>
        </Wrapper>)
        }
        </>
    )
}


const Wrapper = ({toggle, setToggle, children, ...rest}) => {


    const y = useMotionValue(0);

    const variants = {
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.2, ease: "linear" },
        },
        exit: {
          opacity: 0,
          y: 500,
          transition: { ease: "linear", duration: 0.2 },
        },
      };

    return (
    
    <div className="modal-wrapper"

    >
        <div className="modal-backdrop"
            onClick={() => setToggle(prev => false) }
        />
        <motion.div className="modal-container"
            initial="exit"
            animate="visible"
            exit="exit"
            variants={variants}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={1}
            transition={{
            type: "spring",
            velocity: 50,
            duration: 0.2,
            mass: 0.5,
            }}
            style={{ y }}
        >
            <div className="modal-content">
                {children}
            </div>
        </motion.div>
    </div>)
}

export default NewsModal

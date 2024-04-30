import { useState } from 'react';
import ModalChild from './ModalChild';

const ModalParent = () => {
    const [modal,setModal] = useState(false);
    return (
        <div>
            Inside the modal
            {
                modal ? <ModalChild setModal={setModal}  />
                : <button onClick={()=>setModal(prv=> !prv)}>Open Modal</button>
            }
        </div>
    );
};

export default ModalParent;
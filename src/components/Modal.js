// /* eslint react/no-multi-comp: 0, react/prop-types: 0 */

// import React from 'react';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';


// class MyModal extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             modal: false
//         };

//         this.toggle = this.toggle.bind(this);
//     }

//     componentDidMount() {
//         console.log(this.props)
//     }

//     toggle() {
//         this.setState(prevState => ({
//             modal: !prevState.modal
//         }));
//         console.log(this.state.modal)
//     }

//     render() {
//         return (
//             <div>
//                 <Modal isOpen={this.props.open} className={this.props.className}>
//                     <ModalHeader toggle={this.props.open}>Modal title</ModalHeader>
//                     <ModalBody>
//                         Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button color="primary" onClick={this.props.close}>Do Something</Button>{' '}
//                         <Button color="secondary" onClick={this.props.close}>Cancel</Button>
//                     </ModalFooter>
//                 </Modal>
//             </div>
//         );
//     }
// }

import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

class MyModal extends React.Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }


    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.open}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    <h2 ref={subtitle => this.subtitle = subtitle}>{this.props.heading}</h2>
                    <div>{this.props.message}</div>
                    <button onClick={this.props.close}>close</button>
                </Modal>
            </div>
        );
    }
}

export default MyModal;


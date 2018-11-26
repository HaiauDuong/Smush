// import React, { Component } from "react";
// import Fullscreen from "react-full-screen";
// import Display from "./display";
 
// class FullScreen extends Component {
//   constructor(props) {
//     super();
 
//     this.state = {
//       isFull: false,
//     };
//   }
 
//   goFull = () => {
//     this.setState({ isFull: true });
//   }
 
//   render() {
//     return (
//       <div className="App">
//         <button onClick={this.goFull}>
//           Go Fullscreen
//         </button>
 
//         <Fullscreen
//           enabled={this.state.isFull}
//           onChange={isFull => this.setState({isFull})}
//         >
//           <div className="full-screenable-node">
//             <Display />
//           </div>
//         </Fullscreen>
//       </div>
//     );
//   }
// }
 
// export default FullScreen;
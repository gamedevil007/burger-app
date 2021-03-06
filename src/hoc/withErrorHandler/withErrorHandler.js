import React,{Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler=(WrappedComponent,axios)=>{
    let interceptorRequest=null;
    let interceptorResponse=null;
    return class extends Component{
        
        state={
            error:null
        }
        
        componentWillMount(){
            interceptorResponse=axios.interceptors.response.use(response=>response,error=>{
                this.setState({error:error});
            });
            interceptorRequest=axios.interceptors.request.use(request=>{
                this.setState({error:null});
                return request;
            });
        }
        componentWillUnmount(){
            axios.interceptors.response.eject(interceptorResponse);
            axios.interceptors.request.eject(interceptorRequest);
        }

        errorConfirmedHandler=()=>{
            this.setState({error:null});
        }
       render(){
            return (
            <Auxiliary>
            <Modal 
            show={this.state.error} 
            modalClosed={this.errorConfirmedHandler}>
                {this.state.error?this.state.error.message:null}
            </Modal>
            <WrappedComponent {...this.props}/>
            </Auxiliary>
        );
       }
    }
}

export default withErrorHandler;
import { store } from 'react-easy-state';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080';


const Store = store({
	user: {},
	isAuthenticated: false,
	


    authenticate: (username, password) => {
        return new Promise( (resolve, reject) => {
            axios.post('/auth', {
              username,
              password
            }).then(data => {
              data = data.data
              // console.log(data.code)
              if(data.code == 0) {
								Store.user = data.user;
                Store.isAuthenticated = true;
                console.log(" The user is logged in: ",Store.isAuthenticated)
              }
              resolve(data);
            }).catch(err => {
              console.log("Logging in error", err);
              reject(err)
            })
          })
	},



	signup: (user) => {
		const { name, username, password, email, role, phone } = user;
		console.log("/signup", user)
		return new Promise( (resolve, reject) => {
			axios.post("/signup", {
				name,
				password,
				email,
				username,
				role,
				phone
			}).then( data =>{
				data = data.data;
				const { code, user, err} = data;
				if(code==0) {
					resolve(user);
				}else {
					reject(err)
				}
			//   console.log(data);

		}).catch( err=> {
			console.log(err);
			reject(err);
		})
		})	
	
	},


	signout: () => {
		var storage = window.localStorage;
		storage.removeItem('token');
		Store.isAuthenticated = false;
		Store.user = {}
	},

	getUser: () => {
		var storage = window.localStorage;
		var token = storage.getItem('token');
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
		axios.get("/user")
					.then( data => {
						data = data.data;
						console.log("user", data);
						Store.user = data.user;
						Store.stp = data.stp;
						Store.tanks = data.tanks;
						Store.notifications = data.notifications;
						Store.isAuthenticated = true;
						console.log("User is authenticated")
					})
					.catch( err => console.log(err));
		
	}

});

Store.getUser();
// var storage = window.localStorage;
// var token = storage.getItem('token');
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
// axios.get("/user")
// 			.then( data => {
// 				data = data.data;
// 				console.log("user", data.user);
// 				Store.user = data.user;
// 				Store.stp = data.stp;
// 				Store.tanks = data.tanks;
// 				Store.notifications = data.notifications;
// 				Store.isAuthenticated = true;
// 			})
// 			.catch( err => console.log(err));


export default Store;
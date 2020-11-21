import { Button, Card } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import './ApprovePost.scss'

export default function ApprovePost() {
    const [unApprovedPosters, setUnApprovedPosters] = useState([]);


    useEffect(() => {
        var UNAPPROVEDPOSTS = []
        const unsubscribe = db.collection('posters').onSnapshot((snapshot) => {
            if (!snapshot) {
                return;
            }

            setUnApprovedPosters(snapshot.docs.map(doc => {

                // console.log(doc.data().approved)
                if (!doc.data().approved) {
                    return ({
                        id: doc.id,        //the unique 'auto' ids
                        data: doc.data()
                    })

                }
                //the data inside the doc(coll>doc>data)
            }
            ))

        });

        //    console.log(posters[0].data.name);


        return () => {      //when comp cleansup/unmount(cleansup is better), (always) detach this real time listener after it's done using it(best def)
            unsubscribe();  //this is for optimization
        }

    }, []);

    const handleApprove = (id) => {
        console.log(id)
        db.collection("posters").doc(id).update({
            approved: true
        })
    }

    const handleHomeRoute = () => {
        window.location.assign("/");
    }


    return (
        <div>
            <div className="center">
                <div>
                    <Button onClick={handleHomeRoute}>Home</Button>
                </div>
                {
                    unApprovedPosters.map((unApprovedPoster) => {
                        console.log("hey in map while rendering")
                        console.log(unApprovedPoster)
                        if (!unApprovedPoster) {
                            console.log("no unapproved posts")
                            return;
                        }
                        return (
                            <div style={{ margin: "10px" }}>

                                <Card>
                                    <div style={{ paddingLeft: "4vw", paddingRight: "4vw", padding: "1vh" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <h4>{unApprovedPoster.data.name}</h4>
                                            <Button onClick={() => { handleApprove(unApprovedPoster.id) }}>Approve Post</Button>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

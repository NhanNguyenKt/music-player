import { Button, Grid } from "@mui/material";


export default function Header ({libraryCLick}){
    return(
        <Grid display="flex" justifyContent="space-around" alignItems="baseline" container>
            <Grid  item> Kt Player</Grid>
            <Grid  item> <Button onClick={libraryCLick}>Library</Button></Grid>
        </Grid>
    )
}
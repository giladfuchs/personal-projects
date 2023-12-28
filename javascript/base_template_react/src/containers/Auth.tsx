import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";

// import { Redirect } from "react-router-dom";

import * as language from "../assets/language";

import {
  Typography,
  Container,
  Button,
  CssBaseline,
  CardMedia,
} from "@material-ui/core";

import {  useStylesContainer } from "../services";
import { Inputs } from "../common/ui/forms/Inputs";
import { password, username } from "../common/types/form/ui_types/input-types";
import { useActions, useTypedSelector } from "../store";
import { useNavigate } from 'react-router-dom';



const Auth = () => {
  const classes = useStylesContainer();
   const navigate = useNavigate();
  const { login , loginCheck} = useActions();

  const isTokenSet = useTypedSelector((state) => state.reducer.isTokenSet)
  const loading = useTypedSelector((state) => state.reducer.loading)
  const [form, setForm] = useState({
    username: { ...username },
    password: { ...password },
  });

  const onClickNext = () => {
    const loginForm = {
      username: form.username.value,
      password: form.password.value,
    };
    
    login(loginForm);
  };
  useEffect(() => {
    isTokenSet && loginCheck() && navigate("/");

  }, [isTokenSet]);
  
  return (
    <React.Fragment>
      <CssBaseline />

      <Container maxWidth="sm" className={classes.container}>
        <CardMedia
          className={classes.media}
          image={
            "https://static.everypixel.com/ep-pixabay/1224/4468/2420/70428/12244468242070428152-tree.jpg"
          }
        />
        <Typography component="div" />

        <form className={classes.root} noValidate autoComplete="off">
          <Inputs form={form} setForm={setForm} />
          {loading ? (
            <ReactLoading
              type="bars"
              color="#7467ef"
              height={100}
              width={100}
            />
          ) : (
            <Button
              disabled={
                !(
                  !form.username.error &&
                  !form.password.error &&
                  form.username.touched &&
                  form.password.touched
                )
              }
              variant="contained"
              color="primary"
              onClick={onClickNext}
            >
              {language.login}
            </Button>
          )}
        </form>
      </Container>
    </React.Fragment>
  );
};


export default Auth
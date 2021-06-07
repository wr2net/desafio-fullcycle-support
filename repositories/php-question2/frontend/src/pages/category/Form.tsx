import * as React from 'react';
import {Box, Button, ButtonProps, Checkbox, makeStyles, TextField} from "@material-ui/core";
import {Theme} from "@material-ui/core/styles";
import useForm from "react-hook-form";
import categoryHttp from "../../util/http/category-http";

const useStyles = makeStyles((theme: Theme) => {
    return {
        submit: {
            margin: theme.spacing(1)
        }
    }
});

export const Form = () => {

    const classes = useStyles();

    const buttonProps: ButtonProps = {
        variant: "contained",
        className: classes.submit
    };

    const {register, getValues, handleSubmit} = useForm({
        defaultValues: {
            is_active: true
        }
    });

    function onSubmit(formData, event) {
        categoryHttp.create(formData)
            .then(response => console.log(response));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                name={'name'}
                label={'Nome'}
                fullWidth
                variant={'outlined'}
                inputRef={register}
            />
            <TextField
                name={'description'}
                label={'Descrição'}
                multiline
                rows={'4'}
                fullWidth
                variant={'outlined'}
                margin={'normal'}
                inputRef={register}
            />
            <Checkbox
                name={'is_active'}
                defaultChecked
                inputRef={register}
            />
            Ativo?
            <Box dir={'rtl'}>
                <Button
                    color={'primary'}
                    {...buttonProps}
                    onClick={() => onSubmit(getValues(), null)}
                >
                    Salvar
                </Button>
                <Button {...buttonProps} type={'submit'} >Salvar e continuar editando</Button>
            </Box>
        </form>
    );
};
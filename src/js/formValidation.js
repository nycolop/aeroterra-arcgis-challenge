window.addEventListener('load', () => {
    DOMForm.form.addEventListener('submit', e => {
        e.preventDefault();
        validateFields();
    });

    const validateFields = () => {
        const values = {
            nameValue: DOMForm.name.value,
            addressValue: DOMForm.address.value,
            phoneValue: DOMForm.phone.value,
            categoryValue: DOMForm.category.value,
            coordXValue: DOMForm.coords.coordX.value,
            coordYValue: DOMForm.coords.coordY.value
        }

        // Name Input
        if (!values.nameValue) {
            validateError(DOMForm.name, 'Campo requerido');
        } else {
            validateSuccess(DOMForm.name);
        }

        // Address Input
        if (!values.addressValue) {
            validateError(DOMForm.address, 'Campo requerido');
        } else {
            validateSuccess(DOMForm.address);
        }

        // Phone Input
        if (!values.phoneValue) {
            validateError(DOMForm.phone, 'Campo requerido');
        } else {
            validateSuccess(DOMForm.phone);
        }

        // Category Input
        if (values.categoryValue === "default") {
            validateError(DOMForm.category, 'Campo requerido');
        } else {
            validateSuccess(DOMForm.category);
        }

        // Coordenadas Inputs
        if (!values.coordXValue) {
            validateError(DOMForm.coords.coordX, 'Campo requerido');
        } else if (!Number(values.coordXValue)) {
            validateError(DOMForm.coords.coordX, 'Debe ser un número');
        } else if (values.coordXValue > 180 || values.coordXValue < -180) {
            validateError(DOMForm.coords.coordX, 'El valor debe ser entre -180 y 180');
        } else {
            validateSuccess(DOMForm.coords.coordX);
        }

        if (!values.coordYValue) {
            validateError(DOMForm.coords.coordY, 'Campo requerido');
        } else if (!Number(values.coordYValue)) {
            validateError(DOMForm.coords.coordY, 'Debe ser un número');
        } else if (values.coordYValue > 90 || values.coordYValue < -90) {
            validateError(DOMForm.coords.coordY, 'El valor debe ser entre -90 y 90');
        } else {
            validateSuccess(DOMForm.coords.coordY);
        }
    }

    const validateSuccess = input => {
        const formControl = input.parentElement.parentElement;
        formControl.className = 'validate-success';
    }

    const validateError = (input, message) => {
        const formControl = input.parentElement.parentElement;
        const alert = formControl.querySelector('small');
        alert.innerText = message;
        formControl.className = 'validate-error';
    }
});
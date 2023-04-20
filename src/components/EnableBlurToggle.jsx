const EnableBlurToggle = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const blurElements = document.querySelectorAll('.blur');

        blurElements.forEach(element => {
            element.addEventListener('click', () => {
                element.classList.remove('blur');
            });
        });
    });
}


export default EnableBlurToggle;
using FluentValidation;
using InternetShopBackend.Modals;

namespace InternetShopBackend.Validators
{
    public class OrderValidator : AbstractValidator<PushOrder>
    {
        public OrderValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Поле не може бути пустим!")
                .MaximumLength(255).WithMessage("Довжина не може перевищувати 255 символів");

            RuleFor(x => x.Surname)
                .NotEmpty().WithMessage("Поле не може бути пустим!")
                .MaximumLength(255).WithMessage("Довжина не може перевищувати 255 символів");
            RuleFor(x => x.ParentName)
                .NotEmpty().WithMessage("Поле не може бути пустим!")
                .MaximumLength(255).WithMessage("Довжина не може перевищувати 255 символів");
            RuleFor(x => x.PhoneNumber)
                .NotEmpty().WithMessage("Поле не може бути пустим!")
                .MaximumLength(255).WithMessage("Довжина не може перевищувати 255 символів");

            RuleFor(x => x.Post)
                .NotEmpty().WithMessage("Поле не може бути пустим!")
                .MaximumLength(255).WithMessage("Довжина не може перевищувати 255 символів");
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Поле не може бути пустим!")
                .MaximumLength(255).WithMessage("Довжина не може перевищувати 255 символів")
                .EmailAddress().WithMessage("Поле повинно бути відповідно до email регламенту");

        }
    }
}

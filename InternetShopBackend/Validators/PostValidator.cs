using FluentValidation;
using InternetShopBackend.Modals;

namespace InternetShopBackend.Validators
{
    public class AddPostValidator : AbstractValidator<AddPostModal>
    {
        public AddPostValidator()
        {
            RuleFor(x => x.Image)
                .NotEmpty().WithMessage("Поле не може бути пустим!")
                .MinimumLength(2).WithMessage("Мінімальна кількість символів - 2");

        }
    }


    public class DeletePostValidator : AbstractValidator<DeletePostModal>
    {
        public DeletePostValidator()
        {
            RuleFor(x => x.Id)
                .GreaterThan(0).WithMessage("Поле не може набувати від'ємних значень");
        }
    }
}

using FluentValidation;
using InternetShopBackend.Modals;

namespace InternetShopBackend.Validators
{
    public class AddFilterValidator : AbstractValidator<AddFilter>
    {
        public AddFilterValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Поле не може бути пустим!")
                .MinimumLength(2).WithMessage("Мінімальна кількість символів - 2");
           

        }
    }


    public class DeleteFilterValidator : AbstractValidator<DeleteFilter>
    {
        public DeleteFilterValidator()
        {
            RuleFor(x => x.Id)
                .GreaterThan(0).WithMessage("Поле не може набувати від'ємних значень");
        }
    }
}

using FluentValidation;
using InternetShopBackend.Modals;

namespace InternetShopBackend.Validators
{
    public class AddFeedbackValidator : AbstractValidator<AddFeedback>
    {
        public AddFeedbackValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Поле не може бути пустим!")
                .MinimumLength(2).WithMessage("Мінімальна кількість символів - 2");
            RuleFor(x => x.Message)
                .NotEmpty().WithMessage("Поле не може бути пустим!")
                .MinimumLength(2).WithMessage("Мінімальна кількість символів - 2");
            RuleFor(x => x.Image)
                .NotEmpty().WithMessage("Поле не може бути пустим!")
                .MinimumLength(2).WithMessage("Мінімальна кількість символів - 2");
            RuleFor(x => x.Time)
                .NotNull().WithMessage("Поле не може приймати null-значення");
        }
    }

    public class DeleteFeedbackValidator : AbstractValidator<DeleteFeedback>
    {
        public DeleteFeedbackValidator()
        {
            RuleFor(x => x.Id)
                .GreaterThan(0).WithMessage("Поле не може набувати від'ємних значень");
        }
    }
}


using FluentValidation;
using InternetShopBackend.Modals;

namespace InternetShopBackend.Validators
{
    public class AddStoryValidator : AbstractValidator<AddStoryModal>
    {
        public AddStoryValidator()
        {
            RuleFor(x => x.Image)
                .NotEmpty().WithMessage("Поле не може бути пустим!")
                .MinimumLength(2).WithMessage("Мінімальна кількість символів - 2");
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Поле не може бути пустим");
             
        }
    }

    public class DeleteStoryValidator : AbstractValidator<DeleteStoryModal>
    {
        public DeleteStoryValidator()
        {
            RuleFor(x => x.Id)
                .GreaterThan(0).WithMessage("Поле не може набувати від'ємних значень");
        }
    }
}

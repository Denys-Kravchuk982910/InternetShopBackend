using FluentValidation;
using InternetShopBackend.Modals;

namespace InternetShopBackend.Validators
{
    public class AddProductValidator : AbstractValidator<AddProduct>
    {
        public AddProductValidator()
        {
            RuleFor(x => x.Title)
                .NotNull().WithMessage("Поле не може бути null-значення")
                .NotEmpty().WithMessage("Поле не може бути пустим!")
                .MinimumLength(2).WithMessage("Кількість не може бути меншою за 2");
            RuleFor(x => x.Description)
                .NotNull().WithMessage("Поле не може бути null-значення")
                .NotEmpty().WithMessage("Поле не може бути пустим!")
                .MinimumLength(2).WithMessage("Кількість не може бути меншою за 2");
            RuleFor(x => x.Price)
                .GreaterThanOrEqualTo(0).WithMessage("Поле не може набувати від'ємних значень");
            RuleFor(x => x.Count)
               .GreaterThanOrEqualTo(0).WithMessage("Поле не може набувати від'ємних значень");
        }
    }

    public class EditProductValidator : AbstractValidator<EditProduct>
    {
        public EditProductValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0).WithMessage("Поле не може набувати від'ємних значень");
            RuleFor(x => x.Title)
                .NotNull().WithMessage("Поле не може бути null-значення")
                .NotEmpty().WithMessage("Поле не може бути пустим!")
                .MinimumLength(2).WithMessage("Кількість не може бути меншою за 2");
            RuleFor(x => x.Description)
                .NotNull().WithMessage("Поле не може бути null-значення")
                .NotEmpty().WithMessage("Поле не може бути пустим!")
                .MinimumLength(2).WithMessage("Кількість не може бути меншою за 2");
            RuleFor(x => x.Price)
                .GreaterThanOrEqualTo(0).WithMessage("Поле не може набувати від'ємних значень");
            RuleFor(x => x.Count)
               .GreaterThanOrEqualTo(0).WithMessage("Поле не може набувати від'ємних значень");
        }
    }

    public class DeleteProductValidator : AbstractValidator<DeleteProduct>
    {
        public DeleteProductValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0).WithMessage("Поле не може набувати від'ємних значень");
        }
    }

    public class GetProductValidator : AbstractValidator<GetProduct>
    {
        public GetProductValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0).WithMessage("Поле не може набувати від'ємних значень");
        }
    }

}

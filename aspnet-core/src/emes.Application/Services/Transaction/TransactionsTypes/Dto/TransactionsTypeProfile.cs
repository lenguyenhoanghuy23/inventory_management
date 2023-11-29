

namespace emes.Services.Transaction.TransactionsTypes.Dto
{
    public class TransactionsTypeProfile : Profile
    {
        public TransactionsTypeProfile()
        {
            CreateMap<TransactionsTypeDto, MaterialTransactionsTypesModel>();
            

            CreateMap<TransactionsTypeCreateDto, MaterialTransactionsTypesModel>();
        }
    }
}

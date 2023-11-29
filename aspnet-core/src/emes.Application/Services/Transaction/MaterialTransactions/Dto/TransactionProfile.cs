using AutoMapper;
using emes.Models.Transactions;


namespace emes.Services.Transaction.MaterialTransactions.Dto
{
    public class TransactionProfile : Profile
    {
        public TransactionProfile()
        {
            CreateMap<TransactionDto, MaterialTransactionsModel>();
            CreateMap<TransactionDto, MaterialTransactionsModel>()
                .ForMember(x => x.MaterialNumber, opt => opt.Ignore())
                 .ForMember(x => x.MaterialNumber, opt => opt.Ignore())
                .ForMember(x => x.TransactionTypeId, opt => opt.Ignore())
                .ForMember(x => x.IsCompleted, opt => opt.Ignore())

                .ForMember(x => x.TransactionType, opt => opt.Ignore());

            CreateMap<TransactionCreateDto, MaterialTransactionsModel>();
            CreateMap<TransactionCreateDto, MaterialTransactionsModel>()
                .ForMember(x => x.MaterialNumber, opt => opt.Ignore())
                .ForMember(x => x.TransactionType, opt => opt.Ignore());


            CreateMap<TransactionUpdateDto, MaterialTransactionsModel>();
            CreateMap<TransactionUpdateDto, MaterialTransactionsModel>()
                .ForMember(x => x.MaterialNumber, opt => opt.Ignore())
                .ForMember(x => x.TransactionType, opt => opt.Ignore());
        }
    }
}

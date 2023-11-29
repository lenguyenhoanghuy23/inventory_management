using emes.Debugging;

namespace emes
{
    public class emesConsts
    {
        public const string LocalizationSourceName = "emes";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "433c6d55641845efb302c216454d0882";


    }


}

module nftSwiss::revive {
    use sui::url::{Self, Url};
    use std::string;
    use sui::object::{Self, ID, UID};
    use sui::event;
    use sui::transfer;
    use sui::coin::{Self, Coin};
    use sui::tx_context::{Self, TxContext};
    use sui::sui::SUI;
     
    struct Project has key, store {
        id: UID,
        project_name: string::String,
        github: string::String,
        founder: string::String,
        funding_address: string::String,
        url: Url,
    }

    struct MintNFTEvent has copy, drop {
        object_id: ID,
        // The creator of the NFT
        creator: address,
        project_name: string::String,
        github: string::String,
        founder: string::String,
        funding_address: string::String,
        url: Url,
    }

    /// Create a new project as nft for funding
    public entry fun mint(
        project_name: vector<u8>,
        github: vector<u8>,
        founder: vector<u8>,
        funding_address: vector<u8>,
        url: vector<u8>,
        ctx: &mut TxContext
    ) {
        let nft = Project {
            id: object::new(ctx),
            project_name: string::utf8(project_name),
            github: string::utf8(github),
            founder: string::utf8(founder),
            funding_address: string::utf8(funding_address),
            url: url::new_unsafe_from_bytes(url)
        };
        let sender = tx_context::sender(ctx);
        event::emit(MintNFTEvent {
            object_id: object::uid_to_inner(&nft.id),
            creator: sender,
            project_name: nft.project_name,
            github: nft.github,
            founder: nft.founder,
            funding_address: nft.funding_address,
            url: nft.url
        });
        transfer::public_transfer(nft, sender);
    }

    // trasnfer Fund - the project
    public entry fun transfer_token( coin: Coin<SUI>, recipient: address, amount:u64, _ctx: &mut TxContext){
        let fees = coin::split(&mut coin, amount ,_ctx);
        transfer::public_transfer(fees, recipient);

        transfer::public_transfer(coin, tx_context::sender(_ctx));
    }


    // Get the NFT's `project name`
    public fun get_project_name(nft: &Project): &string::String {
        &nft.project_name
    }

    // Get the NFT's `github name`
    public fun get_github(nft: &Project): &string::String {
        &nft.github
    }

    // Get the NFT's `founder`
    public fun get_founder(nft: &Project): &string::String {
        &nft.founder
    }

    // Get the NFT's `url`
    public fun url(nft: &Project): &Url {
        &nft.url
    }
}